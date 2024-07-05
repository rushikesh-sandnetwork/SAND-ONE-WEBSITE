import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LongText extends StatelessWidget {
  final FormFieldSetter<String>? onSaved;

  LongText({Key? key, this.onSaved}) : super(key: key);

  final TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Long Text",
            style:
                GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          TextFormField(
            onSaved: (value) {
              onSaved!(_textController.text);
            },
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
    );
  }
}
