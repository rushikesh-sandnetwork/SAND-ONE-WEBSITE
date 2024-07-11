import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Email extends StatelessWidget {
  final FormFieldSetter<String>? onChanged;
  final String? initialValue;

  Email({Key? key, this.onChanged, this.initialValue}) : super(key: key);

  final TextEditingController _emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (initialValue != null) {
      _emailController.text = initialValue!;
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Email",
            style:
                GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          SizedBox(height: 20),
          TextFormField(
            onFieldSubmitted: onChanged,
            controller: _emailController,
            decoration: InputDecoration(
              hintText: 'Enter your email here:',
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
