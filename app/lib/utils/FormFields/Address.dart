import 'package:flutter/material.dart';

class Address extends StatelessWidget {
  final FormFieldSetter<String>? onChangedAddress;
  final FormFieldSetter<String>? onChangedStreetAddress;
  final FormFieldSetter<String>? onChangedStreetAddressLine2;
  final FormFieldSetter<String>? onChangedCity;
  final FormFieldSetter<String>? onChangedState;
  final FormFieldSetter<String>? onChangedPincode;
  final String? initialValue;

  Address({
    Key? key,
    this.onChangedAddress,
    this.onChangedStreetAddress,
    this.onChangedStreetAddressLine2,
    this.onChangedCity,
    this.onChangedState,
    this.onChangedPincode,
    this.initialValue,
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
            initialValue: initialValue,
            onChanged: onChangedAddress,
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
            initialValue: initialValue,
            onChanged: onChangedStreetAddress,
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
            initialValue: initialValue,
            onChanged: onChangedStreetAddressLine2,
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
                      initialValue: initialValue,
                      onChanged: onChangedCity,
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
                      initialValue: initialValue,
                      onChanged: onChangedState,
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
            initialValue: initialValue,
            onChanged: onChangedPincode,
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
