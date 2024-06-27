import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Appointment extends StatefulWidget {
  const Appointment({super.key});

  @override
  State<Appointment> createState() => _AppointmentState();
}

class _AppointmentState extends State<Appointment> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _appointmentTitleController =
      TextEditingController();
  final TextEditingController _dateTimeController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Select a Date",
                style: GoogleFonts.poppins(
                    fontSize: 20, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              TextFormField(
                controller: _dateTimeController,
                decoration: InputDecoration(
                  hintText: 'Select Date and Time',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: BorderSide(color: Colors.grey),
                  ),
                  contentPadding:
                      EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                ),
                onTap: () async {
                  FocusScope.of(context).requestFocus(FocusNode());
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2101),
                  );
                  if (pickedDate != null) {
                    TimeOfDay? pickedTime = await showTimePicker(
                      context: context,
                      initialTime: TimeOfDay.now(),
                    );
                    if (pickedTime != null) {
                      DateTime finalDateTime = DateTime(
                        pickedDate.year,
                        pickedDate.month,
                        pickedDate.day,
                        pickedTime.hour,
                        pickedTime.minute,
                      );
                      _dateTimeController.text = finalDateTime.toString();
                    }
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
