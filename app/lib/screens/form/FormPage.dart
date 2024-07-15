import 'dart:convert';
import 'package:app/screens/form/FormDetailsPage.dart';
import 'package:app/utils/FormButtons/FormTabs.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class PromoterService {
  static const String baseUrl =
      'http://192.168.31.139:8080/api/v1/promoter/fetchPromoterDetails'; // Replace with your actual API URL

  static Future<PromoterDetails> fetchPromoterDetails(String promoterId) async {
    final url = Uri.parse(baseUrl);
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'promoterId': promoterId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return PromoterDetails.fromJson(jsonResponse['data']);
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }
}

class PromoterDetails {
  final String id;
  final List<String> formIds;

  PromoterDetails({required this.id, required this.formIds});

  factory PromoterDetails.fromJson(Map<String, dynamic> json) {
    print('JSON Data: $json');
    return PromoterDetails(
      id: json['_id'],
      formIds: List<String>.from(json['forms'].map((form) => form.toString())),
    );
  }
}

class PromoterDetailsPage extends StatefulWidget {
  final String promoterId;
  const PromoterDetailsPage({required this.promoterId});

  @override
  _PromoterDetailsPageState createState() => _PromoterDetailsPageState();
}

class _PromoterDetailsPageState extends State<PromoterDetailsPage> {
  Future<PromoterDetails>? _promoterDetails;

  @override
  void initState() {
    super.initState();
    _promoterDetails = PromoterService.fetchPromoterDetails(widget.promoterId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        automaticallyImplyLeading: false, // This removes the leading icon
        title: Text(
          'View Your Forms',
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
        margin: EdgeInsets.symmetric(horizontal: 10, vertical: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2), // Shadow color
              spreadRadius: 5, // Spread radius
              blurRadius: 7, // Blur radius
              offset: Offset(0, 3), // Offset in x and y directions
            ),
          ],
        ),
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: <Widget>[
            FutureBuilder<PromoterDetails>(
              future: _promoterDetails,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (snapshot.hasData) {
                  if (snapshot.data!.formIds.isEmpty) {
                    return Center(child: Text('No form IDs found'));
                  }
                  return Expanded(
                    child: ListView.builder(
                      itemCount: snapshot.data!.formIds.length,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => FormDetailsPage(
                                        formId:
                                            snapshot.data!.formIds[index])));
                          },
                          child: FormTabs(
                            id: snapshot.data!.formIds[index],
                            title: "Form " + (index + 1).toString(),
                          ),
                        );
                      },
                    ),
                  );
                } else {
                  return Center(child: Text('No data found'));
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
