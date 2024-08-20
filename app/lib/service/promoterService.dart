import 'dart:convert';
import 'package:http/http.dart' as http;
import '../screens/form/FormAllFormsPage.dart';

class PromoterService {
  static const String baseUrl =
      'http://192.168.95.65:8080/api/v1/promoter/fetchPromoterDetails';
  static Future<PromoterDetails> fetchPromoterDetails(String promoterId) async {
    final url = Uri.parse(baseUrl);
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'promoterId': promoterId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return PromoterDetails.fromJson(jsonResponse['data']);
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }

  static Future<PromoterDetails> fetchNestedForms(String formId) async {
    final url =
        Uri.parse("http://192.168.95.65:8080/api/v1/promoter/fetchFormField");
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'formId': formId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return PromoterDetails.fromJson(jsonResponse['data']);
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }
}
