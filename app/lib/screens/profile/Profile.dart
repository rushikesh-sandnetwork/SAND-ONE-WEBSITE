import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../service/promoterService.dart';
import '../form/FormAllFormsPage.dart';

class Profile extends StatefulWidget {
  final String promoterId;
  const Profile({required this.promoterId});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late Future<PromoterDetails> _promoterDetailsFuture;

  @override
  void initState() {
    super.initState();
    _promoterDetailsFuture =
        PromoterService.fetchPromoterDetails(widget.promoterId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: FutureBuilder<PromoterDetails>(
        future: _promoterDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
                child: Text('Error: ${snapshot.error}',
                    style: GoogleFonts.poppins(color: Colors.white)));
          } else if (snapshot.hasData) {
            final promoterDetails = snapshot.data!;

            return Stack(
              children: [
                Positioned(
                  top: 50,
                  left: 0,
                  right: 0,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const CircleAvatar(
                        radius: 50,
                        backgroundColor: Colors.white,
                        child:
                            Icon(Icons.person, size: 50, color: Colors.black),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        promoterDetails.name,
                        style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        promoterDetails.email,
                        style: GoogleFonts.poppins(
                          color: Colors.grey,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ],
            );
          } else {
            return Center(
                child: Text('No promoter details available',
                    style: GoogleFonts.poppins(color: Colors.white)));
          }
        },
      ),
    );
  }
}
