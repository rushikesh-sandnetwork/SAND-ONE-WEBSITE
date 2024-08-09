import 'dart:convert';
import 'package:app/screens/form/SelectedFormsPage.dart';
import 'package:app/utils/FormButtons/FormTabs.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import '../../service/promoterService.dart';

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

class Formallformspage extends StatefulWidget {
  final String promoterId;
  const Formallformspage({required this.promoterId});

  @override
  State<Formallformspage> createState() => _FormallformspageState();
}

class _FormallformspageState extends State<Formallformspage> {
  Future<PromoterDetails>? _promoterDetails;

  @override
  void initState() {
    super.initState();
    _promoterDetails = PromoterService.fetchPromoterDetails(widget.promoterId);
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
          "Check your Forms",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: Container(
        margin: const EdgeInsets.fromLTRB(10, 0, 10, 0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            FutureBuilder<PromoterDetails>(
              future: _promoterDetails,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (snapshot.hasData) {
                  if (snapshot.data!.formIds.isEmpty) {
                    return const Center(child: Text('No form IDs found'));
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
                                    builder: (context) => SelectedFormsPage(
                                        formTitle:
                                            "Form " + (index + 1).toString(),
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
                  return const Center(child: Text('No data found'));
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
