import {api} from './api';

const api_name = 'api/';

export default {
  register: (data, token) => {
    let url = api_name + 'users/register';
    return api.postMethod(url, data, token);
  },
  login_with_pass: (data, token) => {
    let url = api_name + 'users/login';
    return api.postMethod(url, data, token);
  },
  forgot_password: (data, token) => {
    let url = api_name + 'users/forgot_password';
    return api.postMethod(url, data, token);
  },
  password_otp: (data, token) => {
    let url = api_name + 'users/verifyOtp';
    return api.postMethod(url, data, token);
  },
  resetPassword: (data, token) => {
    let url = api_name + 'users/resetPassword';
    return api.postMethod(url, data, token);
  },
  verify_email: (data, token) => {
    let url = api_name + 'users/verify';
    return api.postMethod(url, data, token);
  },
  verify_email_otp: (data, token) => {
    let url = api_name + 'users/verifyemail';
    return api.postMethod(url, data, token);
  },
  company_logo: (data, token) => {
    let url = api_name + 'company/logo';
    return api.postMethod(url, data, token);
  },
  company_banner: (data, token) => {
    let url = api_name + 'company/banner';
    return api.postMethod(url, data, token);
  },
  update_company_details: (data, token) => {
    let url = api_name + 'company';
    return api.postMethod(url, data, token);
  },
  organization_data: (data, token) => {
    let url = api_name + 'job/organization';
    return api.getMethod(url, token);
  },
  industry_data: (data, token) => {
    let url = api_name + 'job/industry';
    return api.getMethod(url, token);
  },
  teamsize_data: (data, token) => {
    let url = api_name + 'job/teamsize';
    return api.getMethod(url, token);
  },
  candidate_list: (data, token) => {
    let url = api_name + 'candidates/list?' + data;
    return api.getMethod(url, token);
  },
  job_applicants: (data, token) => {
    let url = api_name + 'applicants?' + data;
    return api.getMethod(url, token);
  },
  result_applicants: (data, token) => {
    let url = api_name + 'applicants';
    return api.postMethod(url, data, token);
  },
  company_profile_view: (data, token) => {
    let url = api_name + 'company/cv';
    return api.postMethod(url, data, token);
  },
  save_candidated: (data, token) => {
    let url = api_name + 'company/saved_candidate';
    return api.postMethod(url, data, token);
  },
  unsave_candidated: (data, token) => {
    let url = api_name + 'company/saved_candidate';
    return api.deleteMethod(url, data, token);
  },
  list_bookmarks: (data, token) => {
    let url = api_name + 'company/saved_candidate?' + data;
    return api.getMethod(url, token);
  },
  company_job: (data, token) => {
    let url = api_name + 'company/job?' + data;
    return api.getMethod(url, token);
  },
  job_post: (data, token) => {
    let url = api_name + 'jobs';
    return api.postMethod(url, data, token);
  },
  update_job: (data, token) => {
    let url = api_name + 'jobs';
    return api.putMethod(url, data, token);
  },
  delete_job: (data, token) => {
    let url = api_name + 'job/' + data;
    return api.deleteMethod(url, token);
  },
  benefits: (data, token) => {
    let url = api_name + 'job/benefits?' + data;
    return api.getMethod(url, token);
  },
  benefits: (data, token) => {
    let url = api_name + 'job/benefits';
    return api.getMethod(url, token);
  },
  create_benifits: (data, token) => {
    let url = api_name + 'job/create_benefit';
    return api.postMethod(url, data, token);
  },
  salarytype: (data, token) => {
    let url = api_name + 'job/salarytype?' + data;
    return api.getMethod(url, token);
  },
  jobroles: (data, token) => {
    let url = api_name + 'job/jobroles?' + data;
    return api.getMethod(url, token);
  },
  create_role: (data, token) => {
    let url = api_name + 'job/create_jobroles';
    return api.postMethod(url, data, token);
  },
  jobcategory: (data, token) => {
    let url = api_name + 'job/jobcategory?' + data;
    return api.getMethod(url, token);
  },
  create_category: (data, token) => {
    let url = api_name + 'job/create_jobcategory';
    return api.postMethod(url, data, token);
  },
  tags: (data, token) => {
    let url = api_name + 'job/tags?' + data;
    return api.getMethod(url, token);
  },
  create_tags: (data, token) => {
    let url = api_name + 'job/tags';
    return api.postMethod(url, data, token);
  },
  skills: (data, token) => {
    let url = api_name + 'job/skills?' + data;
    return api.getMethod(url, token);
  },
  create_skills: (data, token) => {
    let url = api_name + 'job/create_skill';
    return api.postMethod(url, data, token);
  },
  salarytype: (data, token) => {
    let url = api_name + 'job/salarytype';
    return api.getMethod(url, token);
  },
  jobtype: (data, token) => {
    let url = api_name + 'job/jobtype';
    return api.getMethod(url, token);
  },
  experience: (data, token) => {
    let url = api_name + 'job/experience';
    return api.getMethod(url, token);
  },
  education: (data, token) => {
    let url = api_name + 'job/education';
    return api.getMethod(url, token);
  },
  job_Categories_list: (data, token) => {
    let url = api_name + 'company/job_title?' + data;
    return api.getMethod(url, token);
  },
  notification: (data, token) => {
    let url = api_name + 'notification';
    return api.getMethod(url, token);
  },
  update_notification: (data, token) => {
    let url = api_name + 'notification/' + data;
    return api.getpatchMethod(url, token);
  },
  mark_all_notification: (data, token) => {
    let url = api_name + 'notification';
    return api.putMethod(url, data, token);
  },
  get_groups: (data, token) => {
    let url = api_name + 'applicants/groups';
    return api.getMethod(url, token);
  },
  search: (data, token) => {
    let url = api_name + 'jobs/ajax?' + data;
    return api.getMethod(url, token);
  },
  add_search: (data, token) => {
    let url = api_name + 'jobs/ajax';
    return api.postMethod(url, data, token);
  },
  company_activity: (data, token) => {
    let url = api_name + 'company/activity?' + data;
    return api.getMethod(url, token);
  },
  contactUsData: (data, token) => {
    let url = api_name + 'job/contact';
    return api.postMethod(url, data, token);
  },
};
