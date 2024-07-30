import 'package:app/screens/attendance/AttendanceWidget.dart';
import 'package:app/screens/attendance/MarkYourAttendancePage.dart';
import 'package:app/screens/form/FormAllFormsPage.dart';
import 'package:app/screens/profile/Profile.dart';
import 'package:app/utils/MainPageBox/MainPageBoxOne.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PromoterDetailsPage extends StatefulWidget {
  final String promoterId;
  const PromoterDetailsPage({super.key, required this.promoterId});

  @override
  _PromoterDetailsPageState createState() => _PromoterDetailsPageState();
}

class _PromoterDetailsPageState extends State<PromoterDetailsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              "Hi, Promoter!",
              style: GoogleFonts.poppins(
                fontSize: 24,
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            Profile(promoterId: widget.promoterId)));
              },
              child: Icon(
                Icons.person,
                color: Color.fromARGB(255, 116, 116, 116),
                size: 25,
              ),
            ),
          ],
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Column(
              children: [
                const SizedBox(height: 15),
                GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => MarkYourAttendancePage(
                              promoterId: widget.promoterId),
                        ),
                      );
                    },
                    child: const AttendanceWidget()),
                const SizedBox(height: 25),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                Formallformspage(promoterId: widget.promoterId),
                          ),
                        );
                      },
                      child: const Mainpageboxone(
                        title: "View Forms",
                        icon: Icons.view_agenda_outlined,
                      ),
                    ),
                    const Mainpageboxone(
                      title: "Attendance",
                      icon: Icons.calendar_month_outlined,
                    ),
                  ],
                ),
                const SizedBox(height: 20),
              ],
            ),
            Image.asset(
              'assets/SAND 1 logo.png',
              height: 25,
            ),
          ],
        ),
      ),
    );
  }
}
