import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Number extends StatefulWidget {
  const Number({super.key});

  @override
  State<Number> createState() => _NumberState();
}

class _NumberState extends State<Number> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _numberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: _titleController,
              decoration: InputDecoration(
                labelText: 'Number',
                labelStyle: GoogleFonts.poppins(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              style: GoogleFonts.poppins(),
            ),
            SizedBox(height: 20),
            TextFormField(
              controller: _numberController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Enter your number here...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              style: GoogleFonts.poppins(),
            ),
          ],
        ),
      ),
    );
  }
}
