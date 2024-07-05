import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../../utils/FormFields/Address.dart';
import '../../utils/FormFields/Appointment.dart';
import '../../utils/FormFields/Email.dart';
import '../../utils/FormFields/FullName.dart';
import '../../utils/FormFields/LongText.dart';
import '../../utils/FormFields/Number.dart';

class FormDetailsPage extends StatefulWidget {
  final String formId;
  const FormDetailsPage({required this.formId});

  @override
  State<FormDetailsPage> createState() => _FormDetailsPageState();
}

class FormService {
  static const String baseUrl =
      'http://192.168.31.139:8080/api/v1/promoter/fetchFormField';

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
            'Failed to fetch promoter details. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching promoter details: $e');
      throw Exception('Failed to fetch promoter details. Error: $e');
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
            'Failed to fetch promoter details. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching promoter details: $e');
      throw Exception('Failed to fetch promoter details. Error: $e');
    }
  }

  static Future<void> submitFormData(
      String collectionName, Map<String, dynamic> data) async {
    final url = Uri.parse(
        'http://192.168.31.139:8080/api/v1/promoter/fillFormData/$collectionName');

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
  final List<String> formFields;

  FormDetails({required this.campaignId, required this.formFields});

  factory FormDetails.fromJson(Map<String, dynamic> json) {
    return FormDetails(
      campaignId: json['campaignId'],
      formFields:
          List<String>.from(json['formFields'].map((form) => form.toString())),
    );
  }
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

  Widget _buildFormField(String fieldType) {
    switch (fieldType) {
      case 'Address':
        return Address(
          onSavedAddress: (value) {
            _formData['address'] = value;
          },
          onSavedStreetAddress: (value) {
            _formData['streetAddress'] = value;
          },
          onSavedStreetAddressLine2: (value) {
            _formData['streetAddressLine2'] = value;
          },
          onSavedCity: (value) {
            _formData['city'] = value;
          },
          onSavedState: (value) {
            _formData['state'] = value;
          },
          onSavedPincode: (value) {
            _formData['pincode'] = value;
          },
        );
      case 'Appointment':
        return Appointment(
          onSaved: (value) {
            _formData['appointment'] = value;
          },
        );
      case 'Email':
        return Email(
          onSaved: (value) {
            _formData['email'] = value;
          },
        );
      case 'Full Name':
        return FullName(
          onSavedFirstName: (value) {
            _formData['firstName'] = value;
          },
          onSavedLastName: (value) {
            _formData['lastName'] = value;
          },
        );
      case 'LongText':
        return LongText(
          onSaved: (value) {
            _formData['longText'] = value;
          },
        );
      case 'Number':
        return Number(
          onSaved: (value) {
            _formData['number'] = value;
          },
        );
      // case 'DatePicker':
      //   return DatePicker(
      //     onSaved: (value) {
      //       _formData['date'] = value;
      //     },
      //   );
      default:
        return Container(); // or a placeholder widget
    }
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        print('Form Data: $_formData');
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
      appBar: AppBar(
        title: Text('Form Details'),
      ),
      body: FutureBuilder<FormDetails>(
        future: _formDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data == null) {
            return Center(child: Text('No data available'));
          } else {
            return Form(
              key: _formKey,
              child: ListView.builder(
                itemCount: snapshot.data!.formFields.length + 1,
                itemBuilder: (context, index) {
                  if (index == snapshot.data!.formFields.length) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                      child: ElevatedButton(
                        onPressed: _submitForm,
                        child: Text('Submit'),
                      ),
                    );
                  } else {
                    return _buildFormField(snapshot.data!.formFields[index]);
                  }
                },
              ),
            );
          }
        },
      ),
    );
  }
}
