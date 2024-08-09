import 'package:app/screens/NestedForms/NestedForm.dart';
import 'package:app/screens/form/FormDetailsPage.dart';
import 'package:app/utils/MainPageBox/MainPageBoxOne.dart';
import 'package:app/utils/MainPageBox/SelectedPageFormBox.dart';
import 'package:app/utils/MainPageBox/SelectedPageFormSecondBox.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class SelectedFormsPage extends StatefulWidget {
  final String formId;
  final String formTitle;
  const SelectedFormsPage(
      {super.key, required this.formId, required this.formTitle});

  @override
  State<SelectedFormsPage> createState() => _SelectedFormsPageState();
}

class _SelectedFormsPageState extends State<SelectedFormsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: const Icon(
              Icons.arrow_back_ios_new,
              color: Colors.grey,
              size: 18,
            ),
          ),
          title: Text(
            widget.formTitle,
            style: GoogleFonts.poppins(
                fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
          ),
          automaticallyImplyLeading: false,
          backgroundColor: Colors.black,
        ),
        backgroundColor: Colors.black,
        body: Container(
          margin: const EdgeInsets.fromLTRB(20, 10, 20, 10),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  FormDetailsPage(formId: widget.formId)));
                    },
                    child: const Mainpageboxone(
                        title: "Fill Form", icon: Icons.edit_calendar_outlined),
                  ),
                  const Mainpageboxone(
                      title: "View Data", icon: Icons.table_chart_rounded)
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              GestureDetector(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ViewAllNestedForms(formId : widget.formId)));
                  },
                  child: SelectedPageFormSecondBox(formId: widget.formId)),
              const SizedBox(
                height: 20,
              ),
              const SelectedPageFormBox(
                  title: "Forms Filled", icon: Icons.check_rounded),
            ],
          ),
        ));
  }
}