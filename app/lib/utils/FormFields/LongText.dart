import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LongText extends StatefulWidget {
  final FormFieldSetter<String>? onChanged;
  final String? initialValue;
  final String longTextTitle;

  LongText(
      {Key? key,
      this.onChanged,
      this.initialValue,
      required this.longTextTitle})
      : super(key: key);

  @override
  State<LongText> createState() => _LongTextState();
}

class _LongTextState extends State<LongText> {
  final TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (widget.initialValue != null) {
      _textController.text = widget.initialValue!;
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.longTextTitle,
            style:
                GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          TextFormField(
            onFieldSubmitted: (value) {
              widget.onChanged!(_textController.text);
            },
            controller: _textController,
            maxLines: 1,
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
