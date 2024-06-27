import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LongText extends StatefulWidget {
  const LongText({super.key});

  @override
  State<LongText> createState() => _LongTextState();
}

class _LongTextState extends State<LongText> {
  final TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Long Text",
              style: GoogleFonts.poppins(
                  fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            TextFormField(
              controller: _textController,
              maxLines: 10,
              decoration: InputDecoration(
                hintText: 'Enter your long text here...',
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
