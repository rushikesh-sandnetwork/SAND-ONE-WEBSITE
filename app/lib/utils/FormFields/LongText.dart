import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LongText extends StatelessWidget {
  final FormFieldSetter<String>? onChanged;
  final String? initialValue;

  LongText({Key? key, this.onChanged, this.initialValue}) : super(key: key);

  final TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (initialValue != null) {
      _textController.text = initialValue!;
    }

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
            onFieldSubmitted: (value) {
              onChanged!(_textController.text);
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
