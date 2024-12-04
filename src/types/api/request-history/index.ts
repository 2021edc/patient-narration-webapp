export interface IRequestDetail {
  narration_subjects: string[];
  user_id: string;
  input_file_s3_identifier: string;
  user_ip_address: string;
  created_on: string;
  created_by: string;
  narration_type: string;
  narration_id: string;
  narration_sites: string[];
  narration_zip_file_s3_identifier: string;
  status: string;
  id: string;
  modified_on: string;
  modified_by: string;
}

export interface IRequestDetailFormatted {
  narration_subjects: string;
  user_id: string;
  input_file_s3_identifier: string;
  user_ip_address: string;
  created_on: string;
  created_by: string;
  narration_type: string;
  narration_id: string;
  narration_sites: string;
  narration_zip_file_s3_identifier: string;
  status: string;
  id: string;
  modified_on: string;
  modified_by: string;
}
