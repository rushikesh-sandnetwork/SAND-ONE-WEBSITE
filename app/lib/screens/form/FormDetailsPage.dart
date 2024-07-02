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

  @override
  void initState() {
    super.initState();
    _formDetailsFuture = FormService.fetchFormDetails(widget.formId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Form Details'),
      ),
      body: SingleChildScrollView(
        child: FutureBuilder<FormDetails>(
          future: _formDetailsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (snapshot.hasData) {
              var formDetails = snapshot.data!;
              return ListView.builder(
                shrinkWrap: true,
                itemCount: formDetails.formFields.length,
                itemBuilder: (context, index) {
                  var fieldName = formDetails.formFields[index];
                  return ListTile(
                    title: Text(fieldName),
                  );
                },
              );
            } else {
              return Center(child: Text('No data available'));
            }
          },
        ),
      ),
    );
  }
}
