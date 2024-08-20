import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ViewAttendancePage extends StatefulWidget {
  final String promoterId;
  const ViewAttendancePage({super.key, required this.promoterId});

  @override
  State<ViewAttendancePage> createState() => _ViewAttendancePageState();
}

class Attendance {
  final String date;
  final String totalTime;
  final String status;

  Attendance(
      {required this.date, required this.totalTime, required this.status});

  factory Attendance.fromJson(Map<String, dynamic> json) {
    return Attendance(
      date: json['date'],
      totalTime: json['totalTime'],
      status: json['status'],
    );
  }
}

class _ViewAttendancePageState extends State<ViewAttendancePage> {
  List<Attendance> _attendanceData = [];
  bool _isLoading = true;
  String _error = '';

  @override
  void initState() {
    super.initState();
    _fetchAttendance();
  }

  Future<void> _fetchAttendance() async {
    setState(() {
      _isLoading = true;
    });

    final url = 'http://192.168.31.139:8080/api/v1/promoter/fetchAttendance';
    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'promoterId': widget.promoterId}),
      );

      if (response.statusCode == 200) {
        final parsedJson = json.decode(response.body);
        final List<dynamic> data = parsedJson['data'];

        setState(() {
          _attendanceData =
              data.map((json) => Attendance.fromJson(json)).toList();
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to load data';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'An error occurred';
        _isLoading = false;
      });
    }
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
            color: Colors.white,
            size: 18,
          ),
        ),
        title: Text(
          "View Your Attendance",
          style: GoogleFonts.poppins(
              fontSize: 18, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error.isNotEmpty
              ? Center(
                  child: Text(_error,
                      style: GoogleFonts.poppins(
                          color: Colors.redAccent,
                          fontSize: 16,
                          fontWeight: FontWeight.w500)))
              : ListView.builder(
                  itemCount: _attendanceData.length,
                  itemBuilder: (context, index) {
                    final attendance = _attendanceData[index];
                    return Container(
                      margin: const EdgeInsets.symmetric(
                          vertical: 8, horizontal: 16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        gradient: LinearGradient(
                          colors: attendance.status == 'Present'
                              ? [Colors.teal[700]!, Colors.teal[400]!]
                              : [Colors.red[700]!, Colors.red[400]!],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        boxShadow: [
                          const BoxShadow(
                            color: Colors.black54,
                            blurRadius: 8,
                            offset: Offset(0, 4),
                          ),
                        ],
                      ),
                      child: ListTile(
                        contentPadding: const EdgeInsets.all(16),
                        title: Text(
                          'Date: ${attendance.date}',
                          style: GoogleFonts.poppins(
                              color: Colors.white, fontSize: 16),
                        ),
                        subtitle: Text(
                          'Total Time: ${attendance.totalTime} hours\nStatus: ${attendance.status}',
                          style: GoogleFonts.poppins(color: Colors.white70),
                        ),
                        leading: Icon(
                          attendance.status == 'Present'
                              ? Icons.check_circle_outline
                              : Icons.cancel_outlined,
                          color: Colors.white,
                          size: 28,
                        ),
                        trailing: const Icon(
                          Icons.more_vert,
                          color: Colors.white54,
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
