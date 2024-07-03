import 'package:flutter/material.dart';

class Address extends StatelessWidget {
  final FormFieldSetter<String>? onSavedAddress;
  final FormFieldSetter<String>? onSavedStreetAddress;
  final FormFieldSetter<String>? onSavedStreetAddressLine2;
  final FormFieldSetter<String>? onSavedCity;
  final FormFieldSetter<String>? onSavedState;
  final FormFieldSetter<String>? onSavedPincode;

  Address({
    Key? key,
    this.onSavedAddress,
    this.onSavedStreetAddress,
    this.onSavedStreetAddressLine2,
    this.onSavedCity,
    this.onSavedState,
    this.onSavedPincode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Address',
            style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            onSaved: onSavedAddress,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter address';
              }
              return null;
            },
            decoration: InputDecoration(
              labelText: 'Address',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Street Address',
            style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            onSaved: onSavedStreetAddress,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Street Address Line 2',
            style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            onSaved: onSavedStreetAddressLine2,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'City',
                      style: Theme.of(context).textTheme.subtitle1,
                    ),
                    SizedBox(height: 12),
                    TextFormField(
                      onSaved: onSavedCity,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'State/Province',
                      style: Theme.of(context).textTheme.subtitle1,
                    ),
                    SizedBox(height: 12),
                    TextFormField(
                      onSaved: onSavedState,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 20),
          Text(
            'Pincode/Zip Code',
            style: Theme.of(context).textTheme.subtitle1,
          ),
          SizedBox(height: 12),
          TextFormField(
            onSaved: onSavedPincode,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
