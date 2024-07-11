import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../../utils/FormFields/Address.dart';
import '../../utils/FormFields/Appointment.dart';
import '../../utils/FormFields/Email.dart';
import '../../utils/FormFields/FullName.dart';
import '../../utils/FormFields/LongText.dart';
import '../../utils/FormFields/Number.dart';

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
  final List<Map<String, dynamic>> formFields;
  final String collectionName;

  FormDetails({
    required this.campaignId,
    required this.formFields,
    required this.collectionName,
  });

  factory FormDetails.fromJson(Map<String, dynamic> json) {
    List<Map<String, dynamic>> fields =
        json['formFields'].map<Map<String, dynamic>>((field) {
      return {
        'key': field['value'],
        '_id': field['_id'],
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
    String fieldType = field['key'] ?? '';
    switch (fieldType) {
      case 'Address':
        return Address(
          initialValue: _formData['address'],
          onChangedAddress: (value) {
            setState(() {
              _formData['address'] = value;
            });
          },
          onChangedStreetAddress: (value) {
            setState(() {
              _formData['streetAddress'] = value;
            });
          },
          onChangedStreetAddressLine2: (value) {
            setState(() {
              _formData['streetAddressLine2'] = value;
            });
          },
          onChangedCity: (value) {
            setState(() {
              _formData['city'] = value;
            });
          },
          onChangedState: (value) {
            setState(() {
              _formData['state'] = value;
            });
          },
          onChangedPincode: (value) {
            setState(() {
              _formData['pincode'] = value;
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
          initialValue: _formData['email'],
          onChanged: (value) {
            setState(() {
              _formData['email'] = value;
            });
          },
        );
      case 'Full Name':
        return FullName(
          initialFirstName: _formData['firstName'],
          initialLastName: _formData['lastName'],
          onChangedFirstName: (value) {
            setState(() {
              _formData['firstName'] = value;
            });
          },
          onChangedLastName: (value) {
            setState(() {
              _formData['lastName'] = value;
            });
          },
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
