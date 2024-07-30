import 'dart:io';

import 'package:app/screens/attendance/CheckWidgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';

class MarkYourAttendancePage extends StatefulWidget {
  final String promoterId;
  const MarkYourAttendancePage({required this.promoterId});

  @override
  State<MarkYourAttendancePage> createState() => _MarkYourAttendancePageState();
}

class _MarkYourAttendancePageState extends State<MarkYourAttendancePage> {
  String checkChoice = 'default';
  XFile? _image; // To hold the captured image

  final ImagePicker _picker = ImagePicker(); // For picking images

  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.camera);
    if (pickedFile != null) {
      setState(() {
        _image = pickedFile;
      });
    }
  }

  void _submit() {
    // Implement your submit logic here
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Submitted successfully!'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: const Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
        ),
        title: Text(
          "Mark your Attendance",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: Column(
        children: [
          // Content above the bottom container
          Column(
            children: [
              GestureDetector(
                onTap: () {
                  setState(() {
                    checkChoice = 'CheckIn';
                  });
                },
                child: CheckWidgets(
                  checkTitle: "Punch In",
                  icon: Icons.more_time_sharp,
                ),
              ),
              GestureDetector(
                onTap: () {
                  setState(() {
                    checkChoice = 'CheckOut';
                  });
                },
                child: CheckWidgets(
                  checkTitle: "Punch Out",
                  icon: Icons.timer_outlined,
                ),
              ),
            ],
          ),

          Expanded(
            child: Container(
              margin: EdgeInsets.only(top: 20),
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.grey.shade800.withOpacity(0.1), Colors.black],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(40.0),
                  topRight: Radius.circular(40.0),
                ),
                color: Colors
                    .black, // Fallback color in case gradient is not applied
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (checkChoice == 'CheckIn') ...[
                    Center(
                      child: Column(
                        children: [
                          _image == null
                              ? Icon(
                                  Icons.camera_alt,
                                  size: 100,
                                  color: Colors.grey.shade50.withOpacity(0.5),
                                )
                              : Image.file(
                                  File(_image!.path),
                                  height: 200,
                                  width: 200,
                                  fit: BoxFit.cover,
                                ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: _pickImage,
                            child: Text('Click Photo'),
                          ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: _submit,
                            child: Text('Submit'),
                          ),
                        ],
                      ),
                    ),
                  ] else if (checkChoice == 'CheckOut') ...[
                    Center(
                      child: Column(
                        children: [
                          Icon(
                            Icons.camera_alt,
                            size: 100,
                            color: Colors.grey.shade50.withOpacity(0.5),
                          ),
                          SizedBox(height: 20),
                          Text(
                            'Take a photo and submit.',
                            style: GoogleFonts.poppins(
                                color: Colors.grey,
                                fontSize: 22,
                                fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: _pickImage,
                            child: Text('Click Photo'),
                          ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: _submit,
                            child: Text('Submit'),
                          ),
                        ],
                      ),
                    ),
                  ] else ...[
                    Center(
                      child: Icon(
                        Icons.timelapse_rounded,
                        size: 100,
                        color: Colors.grey.shade50.withOpacity(0.1),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
