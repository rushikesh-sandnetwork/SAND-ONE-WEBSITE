import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FullName extends StatelessWidget {
  final FormFieldSetter<String>? onChangedFirstName;
  final FormFieldSetter<String>? onChangedLastName;
  final String? initialFirstName;
  final String? initialLastName;

  FullName({
    Key? key,
    this.onChangedFirstName,
    this.onChangedLastName,
    this.initialFirstName,
    this.initialLastName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextEditingController firstNameController = TextEditingController();
    TextEditingController lastNameController = TextEditingController();

    if (initialFirstName != null) {
      firstNameController.text = initialFirstName!;
    }

    if (initialLastName != null) {
      lastNameController.text = initialLastName!;
    }

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
                  controller: firstNameController,
                  onFieldSubmitted: onChangedFirstName,
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
                  controller: lastNameController,
                  onFieldSubmitted: onChangedLastName,
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
