import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/FormDetailsModel.dart';
import '../../utils/FormFields/Address.dart';
import '../../utils/FormFields/Appointment.dart';
import '../../utils/FormFields/Email.dart';
import '../../utils/FormFields/FullName.dart';
import '../../utils/FormFields/Image.dart';
import '../../utils/FormFields/LongText.dart';
import '../../utils/FormFields/Number.dart';

class FormDetailsPage extends StatefulWidget {
  final String formId;
  const FormDetailsPage({required this.formId});

  @override
  State<FormDetailsPage> createState() => _FormDetailsPageState();
}

class _FormDetailsPageState extends State<FormDetailsPage> {
  late Future<FormDetails> _formDetailsFuture;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final Map<String, dynamic> _formData = {};

  void _handleImageChange(String fieldTitle, File? imageFile) {
    if (imageFile != null) {
      setState(() {
        _formData[fieldTitle] = imageFile;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _formDetailsFuture = FormService.fetchFormDetails(widget.formId);
  }

  Widget _buildFormField(Map<String, dynamic> field) {
    String fieldType = field['type'] ?? '';
    String fieldTitle = field['title'] ?? '';
    switch (fieldType) {
      case 'Address':
        return Address(
          addressTitle: fieldTitle,
          initialValue: _formData["$fieldTitle Address"],
          onChangedAddress: (value) {
            setState(() {
              _formData['$fieldTitle Office/Building Name'] = value;
            });
          },
          onChangedStreetAddress: (value) {
            setState(() {
              _formData['$fieldTitle Street Address'] = value;
            });
          },
          onChangedStreetAddressLine2: (value) {
            setState(() {
              _formData['$fieldTitle Street Address Line 2'] = value;
            });
          },
          onChangedCity: (value) {
            setState(() {
              _formData["$fieldTitle City"] = value;
            });
          },
          onChangedState: (value) {
            setState(() {
              _formData['$fieldTitle State'] = value;
            });
          },
          onChangedPincode: (value) {
            setState(() {
              _formData['$fieldTitle Pincode'] = value;
            });
          },
        );
      case 'Date Picker':
        return Appointment(
          appointmentTitle: fieldTitle,
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );
      case 'Email':
        return Email(
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
          emailTitle: fieldTitle,
        );
      case 'Full Name':
        return FullName(
          initialFirstName: _formData["$fieldTitle 1"],
          initialLastName: _formData[fieldTitle + " " + '2'],
          onChangedFirstName: (value) {
            setState(() {
              _formData["$fieldTitle 1"] = value;
            });
          },
          onChangedLastName: (value) {
            setState(() {
              _formData[fieldTitle + " " + '2'] = value;
            });
          },
          fullNameTitle: fieldTitle,
        );
      case 'Image':
        return ImagePickerWidget(
          imageTitle: fieldTitle,
          onChanged: (String title, File? file) {
            _handleImageChange(fieldTitle, file);
          },
        );

      case 'Long Text':
        return LongText(
          longTextTitle: fieldTitle,
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );

      case 'Number':
        return Number(
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );
      default:
        return SizedBox.shrink();
    }
  }

  Future<String> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      print(_formData);
      try {
        String collectionName =
            await FormService.fetchCollectionName(widget.formId);
        String message =
            await FormService.submitFormData(collectionName, _formData);
        return message;
      } catch (e) {
        print('Error submitting form: $e');
        return "Error submitting form";
      }
    }
    return "There is some error";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        automaticallyImplyLeading: false, // This removes the leading icon
        title: Text(
          'Form Details',
          style: GoogleFonts.poppins(
              fontWeight: FontWeight.bold,
              color: Colors.white,
              letterSpacing: 1.5),
        ),
        titleSpacing: 2,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(20))),
        elevation: 3,
        shadowColor: Colors.grey.shade50,
        scrolledUnderElevation: 4,
        surfaceTintColor: Colors.grey.shade50,
        centerTitle: true,
        backgroundColor: Color.fromRGBO(21, 25, 24, 1),
      ),
      body: Container(
        margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.1), // Shadow color
              spreadRadius: 5, // Spread radius
              blurRadius: 7, // Blur radius
              offset: Offset(0, 3), // Offset in x and y directions
            ),
          ],
        ),
        child: FutureBuilder<FormDetails>(
          future: _formDetailsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData) {
              FormDetails formDetails = snapshot.data!;
              return SingleChildScrollView(
                padding: EdgeInsets.all(16.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      ...formDetails.formFields
                          .map((field) => _buildFormField(field))
                          .toList(),
                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: () async {
                          String message = await _submitForm();
                        },
                        child: Text('Submit', style: GoogleFonts.poppins()),
                      ),
                    ],
                  ),
                ),
              );
            } else {
              return Center(child: Text('No form details available.'));
            }
          },
        ),
      ),
    );
  }
}
