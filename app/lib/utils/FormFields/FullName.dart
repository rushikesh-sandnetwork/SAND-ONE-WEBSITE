import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FullName extends StatelessWidget {
  final FormFieldSetter<String>? onSavedFirstName;
  final FormFieldSetter<String>? onSavedLastName;

  FullName({
    Key? key,
    this.onSavedFirstName,
    this.onSavedLastName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Full Name',
            style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: TextFormField(
                  onSaved: onSavedFirstName,
                  decoration: InputDecoration(
                    labelText: 'First Name',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  style: GoogleFonts.poppins(),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: TextFormField(
                  onSaved: onSavedLastName,
                  decoration: InputDecoration(
                    labelText: 'Last Name',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  style: GoogleFonts.poppins(),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
