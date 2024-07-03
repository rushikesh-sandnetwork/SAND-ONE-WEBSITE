import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Number extends StatelessWidget {
  final FormFieldSetter<String>? onSaved;

  Number({Key? key, this.onSaved}) : super(key: key);
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
              onSaved: onSaved,
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
              onSaved: onSaved,
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
