import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter/services.dart';
import 'dart:ui' as ui;

import 'dart:ui' as ui;
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/services.dart';

abstract class LocationHandler {
  static Future<bool> handleLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are disabled. Please enable the services
      return false;
    }
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Location permissions are denied
        return false;
      }
    }
    if (permission == LocationPermission.deniedForever) {
      // Location permissions are permanently denied, we cannot request permissions.

      return false;
    }
    return true;
  }

  static Future<Position?> getCurrentPosition() async {
    try {
      final hasPermission = await handleLocationPermission();
      if (!hasPermission) return null;
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
    } catch (e) {
      return null;
    }
  }

  static Future<String?> getAddressFromLatLng(Position position) async {
    try {
      List<Placemark> placeMarks =
          await placemarkFromCoordinates(position.latitude, position.longitude);
      Placemark place = placeMarks[0];
      return "${place.street}, ${place.subLocality},${place.subAdministrativeArea}, ${place.postalCode}";
    } catch (e) {
      return null;
    }
  }
}

class ImageTextPainter extends CustomPainter {
  final String text;
  final ui.Image image;

  ImageTextPainter(this.text, this.image);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint();

    // Calculate the aspect ratio of the image
    final imageAspectRatio = image.width / image.height;
    final boxAspectRatio = size.width / size.height;

    // Determine the source and destination rectangles
    Rect srcRect;
    Rect dstRect;

    if (imageAspectRatio > boxAspectRatio) {
      // Image is wider relative to the height
      final scaledHeight = size.width / imageAspectRatio;
      srcRect =
          Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble());
      dstRect = Rect.fromLTWH(
          0, (size.height - scaledHeight) / 2, size.width, scaledHeight);
    } else {
      // Image is taller relative to the width
      final scaledWidth = size.height * imageAspectRatio;
      srcRect =
          Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble());
      dstRect = Rect.fromLTWH(
          (size.width - scaledWidth) / 2, 0, scaledWidth, size.height);
    }

    // Draw the image
    canvas.drawImageRect(image, srcRect, dstRect, paint);

    // Draw a black rectangle with semi-transparency at the top with reduced height
    final blackPaint = Paint()
      ..color = Colors.black.withOpacity(0.5)
      ..style = PaintingStyle.fill;
    final textBarHeight = 60.0; // Reduced height of the black bar
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, textBarHeight), blackPaint);

    // Draw the text
    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(color: Colors.white, fontSize: 16),
      ),
      textDirection: TextDirection.ltr,
    )..layout(maxWidth: size.width - 16);

    textPainter.paint(canvas, Offset(8, 8));
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

class ImagePickerWidget extends StatefulWidget {
  final String imageTitle;
  final void Function(String, File?)? onChanged;

  const ImagePickerWidget({required this.imageTitle, this.onChanged});

  @override
  _ImagePickerWidgetState createState() => _ImagePickerWidgetState();
}

class _ImagePickerWidgetState extends State<ImagePickerWidget> {
  final ImagePicker _picker = ImagePicker();
  String? _imagePath;
  String? _textOverlay;

  Future<void> _pickImage(ImageSource source) async {
    final pickedFile = await _picker.pickImage(source: source);
    if (pickedFile != null) {
      final position = await LocationHandler.getCurrentPosition();
      final latitude = position?.latitude ?? 'Unknown';
      final longitude = position?.longitude ?? 'Unknown';
      final date = DateTime.now().toLocal().toString();
      final text = 'Lat: $latitude, Lon: $longitude\nDate: $date';

      setState(() {
        _imagePath = pickedFile.path;
        _textOverlay = text;
      });

      widget.onChanged?.call(widget.imageTitle, File(pickedFile.path));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.imageTitle,
            style:
                GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          SizedBox(height: 20),
          GestureDetector(
            onTap: () => _showImagePickerOptions(context),
            child: Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(12),
              ),
              child: _imagePath == null
                  ? Center(child: Text('Choose an Image'))
                  : Stack(
                      fit: StackFit.expand,
                      children: [
                        FutureBuilder<ui.Image>(
                          future: _loadImageWithText(
                              File(_imagePath!), _textOverlay!),
                          builder: (context, snapshot) {
                            if (snapshot.connectionState ==
                                ConnectionState.done) {
                              return CustomPaint(
                                painter: ImageTextPainter(
                                  _textOverlay!,
                                  snapshot.data!,
                                ),
                              );
                            } else {
                              return Center(child: CircularProgressIndicator());
                            }
                          },
                        ),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }

  Future<ui.Image> _loadImageWithText(File imageFile, String text) async {
    final imageBytes = await imageFile.readAsBytes();
    final Completer<ui.Image> completer = Completer();

    ui.decodeImageFromList(imageBytes, (ui.Image img) {
      completer.complete(img);
    });

    final ui.Image image = await completer.future;

    final recorder = ui.PictureRecorder();
    final canvas = Canvas(
      recorder,
      Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
    );

    final paint = Paint();
    final imageAspectRatio = image.width / image.height;
    final canvasWidth = image.width.toDouble();
    final canvasHeight = image.height.toDouble();

    // Fit the image into the canvas while preserving its aspect ratio
    final dstRect = Rect.fromLTWH(0, 0, canvasWidth, canvasHeight);
    final srcRect =
        Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble());
    canvas.drawImageRect(image, srcRect, dstRect, paint);

    // Draw a black rectangle with semi-transparency at the top with reduced height
    final blackPaint = Paint()
      ..color = Colors.black.withOpacity(0.5)
      ..style = PaintingStyle.fill;
    final textBarHeight = 60.0; // Reduced height of the black bar
    canvas.drawRect(
        Rect.fromLTWH(0, 0, canvasWidth, textBarHeight), blackPaint);

    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(color: Colors.white, fontSize: 16),
      ),
      textDirection: TextDirection.ltr,
    )..layout(maxWidth: canvasWidth - 16);

    textPainter.paint(canvas, Offset(8, 8));

    final picture = recorder.endRecording();
    return await picture.toImage(image.width, image.height);
  }

  void _showImagePickerOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: <Widget>[
              ListTile(
                leading: Icon(Icons.photo_library),
                title: Text(
                  'Choose from Gallery',
                  style: GoogleFonts.poppins(),
                ),
                onTap: () {
                  Navigator.of(context).pop();
                  _pickImage(ImageSource.gallery);
                },
              ),
              ListTile(
                leading: Icon(Icons.camera_alt),
                title: Text(
                  'Take a Photo',
                  style: GoogleFonts.poppins(),
                ),
                onTap: () {
                  Navigator.of(context).pop();
                  _pickImage(ImageSource.camera);
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
