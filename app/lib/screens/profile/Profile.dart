import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  final String promoterId;
  const Profile({required this.promoterId});

  @override
  State<Profile> createState() => _ProfileState();
}


Future<void> fetchDetails()async {
  
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Positioned(
            top: 20,
            left: 5,
            right: 5,
            child: Center(
              child: CircleAvatar(
                radius: 40,
                backgroundColor: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
