class FormData {
  final String id;
  final String promoterId;
  final String personName1;
  final String personName2;
  final String personEmail;
  final bool acceptedData;

  FormData({
    required this.id,
    required this.promoterId,
    required this.personName1,
    required this.personName2,
    required this.personEmail,
    required this.acceptedData,
  });

  factory FormData.fromJson(Map<String, dynamic> json) {
    return FormData(
      id: json['_id'] as String,
      promoterId: json['promoterId'] as String,
      personName1: json['Person Name 1'] as String,
      personName2: json['Person Name 2'] as String,
      personEmail: json['person email'] as String,
      acceptedData: json['acceptedData'] as bool,
    );
  }
}
