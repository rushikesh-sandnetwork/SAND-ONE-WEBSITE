import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import '../../utils/FormFields/Address.dart';
import '../../utils/FormFields/Appointment.dart';
import '../../utils/FormFields/Email.dart';
import '../../utils/FormFields/FullName.dart';
import '../../utils/FormFields/LongText.dart';
import '../../utils/FormFields/Number.dart';

class FormService {
  static const String baseUrl =
      'http://192.168.212.65:8080/api/v1/promoter/fetchFormField';

  static Future<FormDetails> fetchFormDetails(String formId) async {
    try {
      final url = Uri.parse(baseUrl);
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'formId': formId}),
      );

      print('API Response Status Code: ${response.statusCode}');
      print('API Response Body: ${response.body}');

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return FormDetails.fromJson(jsonResponse['data'][0]);
      } else {
        throw Exception(
            'Failed to fetch form details. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching form details: $e');
      throw Exception('Failed to fetch form details. Error: $e');
    }
  }

  static Future<String> fetchCollectionName(String formId) async {
    try {
      final url = Uri.parse(baseUrl);
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'formId': formId}),
      );

      print('API Response Status Code: ${response.statusCode}');
      print('API Response Body: ${response.body}');

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return jsonResponse['data'][0]['collectionName'];
      } else {
        throw Exception(
            'Failed to fetch collection name. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching collection name: $e');
      throw Exception('Failed to fetch collection name. Error: $e');
    }
  }

  static Future<void> submitFormData(
      String collectionName, Map<String, dynamic> data) async {
    final url = Uri.parse(
        'http://192.168.212.65:8080/api/v1/promoter/fillFormData/$collectionName');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        print('Data saved successfully');
      } else {
        throw Exception(
            'Failed to save data. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error saving data: $e');
      throw Exception('Failed to save data. Error: $e');
    }
  }
}

class FormDetails {
  final String campaignId;
  final List<Map<String, dynamic>> formFields;
  final String collectionName;

  FormDetails({
    required this.campaignId,
    required this.formFields,
    required this.collectionName,
  });

  factory FormDetails.fromJson(Map<String, dynamic> json) {
    List<Map<String, dynamic>> fields =
        (json['formFields'] as List).map((field) {
      return {
        'type': field['type'],
        'title': field['title'],
        'uniqueId': field['uniqueId'],
      };
    }).toList();

    return FormDetails(
      campaignId: json['campaignId'],
      formFields: fields,
      collectionName: json['collectionName'],
    );
  }
}

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
              _formData['$fieldTitle Address'] = value;
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
      case 'Appointment':
        return Appointment(
          initialValue: _formData['appointment'],
          onChanged: (value) {
            setState(() {
              _formData['appointment'] = value;
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
      case 'LongText':
        return LongText(
          initialValue: _formData['longText'],
          onChanged: (value) {
            setState(() {
              _formData['longText'] = value;
            });
          },
        );
      case 'Number':
        return Number(
          initialValue: _formData['number'],
          onChanged: (value) {
            setState(() {
              _formData['number'] = value;
            });
          },
        );
      default:
        return Container(); // or a placeholder widget
    }
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        String collectionName =
            await FormService.fetchCollectionName(widget.formId);
        await FormService.submitFormData(collectionName, _formData);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Form submitted successfully!')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit form: $e')),
        );
      }
    }
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
            } else if (!snapshot.hasData || snapshot.data == null) {
              return Center(child: Text('No data available'));
            } else {
              return SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: 5.0, vertical: 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          ...snapshot.data!.formFields.map((field) {
                            return Container(
                              child: _buildFormField(field),
                            );
                          }).toList(),
                          SizedBox(height: 20),
                          Container(
                            margin: EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: ElevatedButton(
                              style: ButtonStyle(
                                padding: MaterialStateProperty.all<EdgeInsets>(
                                  EdgeInsets.all(
                                      16.0), // Adjust padding as needed
                                ),
                                backgroundColor: MaterialStateColor.resolveWith(
                                  (states) => Color.fromRGBO(21, 25, 24, 1),
                                ),
                              ),
                              onPressed: _submitForm,
                              child: Text(
                                'Submit',
                                style: GoogleFonts.poppins(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                    letterSpacing: 1),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }
          },
        ),
      ),
    );
  }
}
