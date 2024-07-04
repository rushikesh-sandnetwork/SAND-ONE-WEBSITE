import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  final String promoterId;
  const Profile({required this.promoterId});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Text("THis is the profile"),
      ),
    );
  }
}
