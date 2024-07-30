import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:async/async.dart';

class FormService {
  static const String baseUrl =
      'http://192.168.31.140:8080/api/v1/promoter/fetchFormField';

  static Future<FormDetails> fetchFormDetails(String formId) async {
    try {
      final url = Uri.parse(baseUrl);
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'formId': formId}),
      );

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return FormDetails.fromJson(jsonResponse['data'][0]);
      } else {
        throw Exception(
            'Failed to fetch form details. Status code: ${response.statusCode}');
      }
    } catch (e) {
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

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return jsonResponse['data'][0]['collectionName'];
      } else {
        throw Exception(
            'Failed to fetch collection name. Status code: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to fetch collection name. Error: $e');
    }
  }

  static Future<String> submitFormData(
      String collectionName, Map<String, dynamic> data) async {
    final url = Uri.parse(
        'http://192.168.31.140:8080/api/v1/promoter/fillFormData/$collectionName');

    var request = http.MultipartRequest('POST', url);

    try {
      for (var entry in data.entries) {
        var key = entry.key;
        var value = entry.value;

        if (value is File) {
          var stream =
              http.ByteStream(DelegatingStream.typed(value.openRead()));
          var length = await value.length();
          var multipartFile = http.MultipartFile(key, stream, length,
              filename: basename(value.path));
          request.files.add(multipartFile);
        } else {
          request.fields[key] = value.toString();
        }
      }

      var response = await request.send();

      if (response.statusCode == 200) {
        print('Data saved successfully');
        return "Data Saved Successfully";
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
