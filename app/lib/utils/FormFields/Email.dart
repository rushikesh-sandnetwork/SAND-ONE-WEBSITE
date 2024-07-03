import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Email extends StatelessWidget {
  final FormFieldSetter<String>? onSaved;

  Email({Key? key, this.onSaved}) : super(key: key);

  final TextEditingController _emailController = TextEditingController();

  final TextEditingController _additionalInfoController =
      TextEditingController();

  @override
  Widget build(BuildContext context) {
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
            onSaved: onSaved,
            controller: _additionalInfoController,
            decoration: InputDecoration(
              hintText: 'Enter your email here :',
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
