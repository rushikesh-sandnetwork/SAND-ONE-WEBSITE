import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

Future<List<Map<String, dynamic>>> fetchFormFilledData(String formId) async {
  final response = await http.post(
    Uri.parse('http://192.168.31.139:8080/api/v1/promoter/fetchFormFilledData'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({'formId': formId}),
  );

  if (response.statusCode == 200) {
    final responseData = json.decode(response.body);
    if (responseData['statuscode'] == 200) {
      return List<Map<String, dynamic>>.from(responseData['data']);
    } else {
      throw Exception(responseData['message']);
    }
  } else {
    throw Exception('Failed to load data');
  }
}

class FormDataScreen extends StatelessWidget {
  final String formId;

  FormDataScreen({required this.formId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
          "View Data",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: fetchFormFilledData(formId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
                child: Text('Error: ${snapshot.error}',
                    style: TextStyle(color: Colors.white)));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(
                child: Text('No data available',
                    style: TextStyle(color: Colors.white)));
          } else {
            final data = snapshot.data!;
            return ListView.builder(
              padding: EdgeInsets.all(16.0),
              itemCount: data.length,
              itemBuilder: (context, index) {
                final entry = data[index];
                return Card(
                  margin: EdgeInsets.only(bottom: 16.0),
                  color: Colors.grey[900], // Dark card background
                  elevation: 4.0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: entry.entries.map((e) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4.0),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                flex: 5,
                                child: Text(
                                  '${e.key}:',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Colors
                                        .teal[200], // Light teal for key text
                                  ),
                                ),
                              ),
                              Expanded(
                                flex: 7,
                                child: Text(
                                  e.value.toString(),
                                  style: TextStyle(
                                    color: Colors
                                        .grey[300], // Light grey for value text
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
