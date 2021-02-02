export class StudentPayload{
    regNo: string;
    satelliteCenter: string;
    titleName: string;
    sureName: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: boolean;
    homeAddress: string;
    workAddress: string;
    mobile: string;
    phone: string
    qualificationTitle: string;
    qStartDate: string;
    qExpectedDate: string;
    qActualDate: string;
    feeOffered: string;
    checkPaid: boolean;
    installment: string;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    isDeleted: boolean;
}

export class Email{
    email: string;
    message: string;
}

export const QualificationTitleDD = [
        { label: 'Short Course - Finance' , value: 'Short Course - Finance' },
        { label: 'Short Course - Buiness Management and Leaderhsip', value: 'Short Course - Buiness Management and Leaderhsip' },
        { label: 'Short Course - Coaching' , value: 'Short Course - Coaching' },
        { label: 'Short Course - Others' , value: 'Short Course - Others' }, 
        { label: 'Level 2 Diploma in Business and Management' , value: 'Level 2 Diploma in Business and Management' },
        { label: 'Level 3 Diploma in Business Innovation and Entrepreneurship' , value: 'Level 3 Diploma in Business Innovation and Entrepreneurship' },
        { label: 'Level 3 Diploma in Introduction to Management' , value: 'Level 3 Diploma in Introduction to Management' },
        { label: 'Level 3 Diploma in Business Management' , value: 'Level 3 Diploma in Business Management' },
        { label: 'Level 3 Integrated Diploma in Business and Management' , value: 'Level 3 Integrated Diploma in Business and Management' },
        { label: 'Level 4 Diploma in Business Management' , value: 'Level 4 Diploma in Business Management' },
        { label: 'Level 4 Diploma in Accounting and Business' , value: 'Level 4 Diploma in Accounting and Business' },
        { label: 'Level 4 Diploma in Entrepreneurship' , value: 'Level 4 Diploma in Entrepreneurship' },
        { label: 'Level 4 Diploma in Marketing' , value: 'Level 4 Diploma in Marketing' },
        { label: 'Level 5 Diploma in Marketing' , value: 'Level 5 Diploma in Marketing' },
        { label: 'Level 2 Diploma in IT / Cyber security' , value: 'Level 2 Diploma in IT / Cyber security' },
        { label: 'Level 3 Diploma in IT / Cyber security' , value: 'Level 3 Diploma in IT / Cyber security' },
        { label: 'Level 4 Diploma in IT / Cyber security' , value: 'Level 4 Diploma in IT / Cyber security' },
        { label: 'Level 5 Diploma in IT / Cyber security' , value: 'Level 5 Diploma in IT / Cyber security' },
        { label: 'Level 7 Diploma in IT / Cyber security' , value: 'Level 7 Diploma in IT / Cyber security' },
        { label: 'Level 4 Diploma in Logistics and Supply Chain Management' , value: 'Level 4 Diploma in Logistics and Supply Chain Management' },
        { label: 'Level 5 Diploma in Logistics and Supply Chain Management' , value: 'Level 5 Diploma in Logistics and Supply Chain Management' },
        { label: 'Level 6 Diploma in Logistics and Supply Chain Management' , value: 'Level 6 Diploma in Logistics and Supply Chain Management' },
        { label: 'Level 7 Diploma in Logistics and Supply Chain Management' , value: 'Level 7 Diploma in Logistics and Supply Chain Management' },
        { label: 'Level 7 Diploma in Project Management' , value: 'Level 7 Diploma in Project Management' },
        { label: 'Level 7 Diploma in Public Administration' , value: 'Level 7 Diploma in Public Administration' },
        { label: 'Level 7 Diploma in Strategic Marketing' , value: 'Level 7 Diploma in Strategic Marketing' },
        { label: 'Level 5 Diploma in Business Management (OTHM)' , value: 'Level 5 Diploma in Business Management (OTHM)' },
        { label: 'Level 5 Diploma in Accounting and Business' , value: 'Level 5 Diploma in Accounting and Business' },
        { label: 'Level 5 Advanced Diploma in Business Administration (EBMA)' , value: 'Level 5 Advanced Diploma in Business Administration (EBMA)' },
        { label: 'Level 5 Diploma in Business Management (Qualifi)' , value: 'Level 5 Diploma in Business Management (Qualifi)' },
        { label: 'Level 6 Diploma in Business Administration' , value: 'Level 6 Diploma in Business Administration' },
        { label: 'Level 6 Diploma in Business Management' , value: 'Level 6 Diploma in Business Management' },
        { label: 'Level 6 Diploma in Accounting and Business' , value: 'Level 6 Diploma in Accounting and Business' },
        { label: 'Level 7 Diploma in CPD for Leadership' , value: 'Level 7 Diploma in CPD for Leadership' },
        { label: 'Level 7 Diploma in Strategic Management and Leadership (OTHM)' , value: 'Level 7 Diploma in Strategic Management and Leadership (OTHM)' },
        { label: 'Level 7 Diploma in Strategic Management and Leadership (Qualifi)' , value: 'Level 7 Diploma in Strategic Management and Leadership (Qualifi)' },
        { label: 'Level 7 Diploma in Business Strategy (Qualifi)' , value: 'Level 7 Diploma in Business Strategy (Qualifi)' },
        { label: 'Level 7 Diploma in Strategic Management and Innovation (Qualifi)' , value: 'Level 7 Diploma in Strategic Management and Innovation (Qualifi)' },
        { label: 'Level 7 Postgraduate Diploma in Business Administration' , value: 'Level 7 Postgraduate Diploma in Business Administration' },
        { label: 'Level 7 Diploma in Executive Management' , value: 'Level 7 Diploma in Executive Management' },
        { label: 'Level 7 Diploma in Human Resource Management' , value: 'Level 7 Diploma in Human Resource Management' },
        { label: 'Level 7 Diploma in Accounting and Finance' , value: 'Level 7 Diploma in Accounting and Finance' },
        { label: 'Level 3 Diploma in Hospitality and Tourism Management (Qualifi)' , value: 'Level 3 Diploma in Hospitality and Tourism Management (Qualifi)' },
        { label: 'Level 4 Diploma in Hospitality and Tourism Management (Qualifi)' , value: 'Level 4 Diploma in Hospitality and Tourism Management (Qualifi)' },
        { label: 'Level 5 Diploma in Hospitality and Tourism Management (Qualifi)' , value: 'Level 5 Diploma in Hospitality and Tourism Management (Qualifi)' },
        { label: 'Level 6 Graduate Diploma in Hospitality and Tourism Management (EBMA)' , value: 'Level 6 Graduate Diploma in Hospitality and Tourism Management (EBMA)' },
        { label: 'Level 7 Diploma in Hospitality and Tourism Management (Qualifi)' , value: 'Level 7 Diploma in Hospitality and Tourism Management (Qualifi)' },
        { label: 'Level 7 Postgraduate Diploma in International Hospitality and Tourism Management (EBMA)' , value: 'Level 7 Postgraduate Diploma in International Hospitality and Tourism Management (EBMA)' },
        { label: 'Level 3 Diploma in Health and Social Care (Qualifi)' , value: 'Level 3 Diploma in Health and Social Care (Qualifi)' },
        { label: 'Level 4 Diploma in Health and Social Care (Qualifi)' , value: 'Level 4 Diploma in Health and Social Care (Qualifi)' },
        { label: 'Level 4 Diploma in Health and Social Care Management (EBMA)' , value: 'Level 4 Diploma in Health and Social Care Management (EBMA)' },
        { label: 'Level 5 Diploma in Health and Social Care (Qualifi)' , value: 'Level 5 Diploma in Health and Social Care (Qualifi)' },
        { label: 'Level 5 Diploma in Health and Social Care Management (OTHM)' , value: 'Level 5 Diploma in Health and Social Care Management (OTHM)' },
        { label: 'Level 5 Advanced Diploma in Health and Social Care Management (EBMA)' , value: 'Level 5 Advanced Diploma in Health and Social Care Management (EBMA)' },
        { label: 'Level 5 Diploma in Health and Social Care (Qualifi)' , value: 'Level 5 Diploma in Health and Social Care (Qualifi)' },
        { label: 'Level 6 Graduate Diploma in Health and Social Care Management' , value: 'Level 6 Graduate Diploma in Health and Social Care Management' },
        { label: 'Level 7 Postgraduate Diploma in Health and Social Care Management (EBMA)' , value: 'Level 7 Postgraduate Diploma in Health and Social Care Management (EBMA)' },
        { label: 'Level 7 Diploma in Health and Social Care Management (OTHM)' , value: 'Level 7 Diploma in Health and Social Care Management (OTHM)' },
        { label: 'Level 7 Diploma in Health and Social Care Leadership (EBMA)' , value: 'Level 7 Diploma in Health and Social Care Leadership (EBMA)' },
        { label: 'Level 7 Diploma in Management and Leadership in Health and Social Care' , value: 'Level 7 Diploma in Management and Leadership in Health and Social Care' },
        { label: 'Qualifi Level 6 Diploma in Occupational Health and Safety Management' , value: 'Qualifi Level 6 Diploma in Occupational Health and Safety Management' },
        { label: 'OTHM Level 6 Certificate in Occupational Health and Safety' , value: 'OTHM Level 6 Certificate in Occupational Health and Safety' },
        { label: 'OTHM Level 7 Dipoma in Occupational Health and Safety Management' , value: 'OTHM Level 7 Dipoma in Occupational Health and Safety Management' },
        { label: 'Level 7 Diploma in International Business Law (leading to LLM Top Up)' , value: 'Level 7 Diploma in International Business Law (leading to LLM Top Up)' },
        { label: 'LLM Top Up' , value: 'LLM Top Up' },
        { label: 'Level 3 Award in Assessing Vocationally Related Achievement' , value: 'Level 3 Award in Assessing Vocationally Related Achievement' },
        { label: 'Level 3 Certificate in Assessing Vocationally Related Achievement' , value: 'Level 3 Certificate in Assessing Vocationally Related Achievement' },
        { label: 'Level 3 Award in Education and Training' , value: 'Level 3 Award in Education and Training' },
        { label: 'Level 3 Diploma in Education and Training' , value: 'Level 3 Diploma in Education and Training' },
        { label: 'Level 4 Award in Internal Quality Assurance of Assessment Processes and Practice' , value: 'Level 4 Award in Internal Quality Assurance of Assessment Processes and Practice' },
        { label: 'Level 4 Certificate in Leading the Internal Quality Assurance of Assessment Processes and Practice' , value: 'Level 4 Certificate in Leading the Internal Quality Assurance of Assessment Processes and Practice' },
        { label: 'Level 4 Diploma in Education and Training' , value: 'Level 4 Diploma in Education and Training' },
        { label: 'Level 5 Diploma in Education and Training' , value: 'Level 5 Diploma in Education and Training' },
        { label: 'Level 7 Diploma in Education Management and Leadership' , value: 'Level 7 Diploma in Education Management and Leadership' },
        { label: 'Level 8 Diploma in Strategic Management and Leadership (Qualifi)' , value: 'Level 8 Diploma in Strategic Management and Leadership (Qualifi)' },
        { label: 'Level 8 Diploma in Business and Management Research (EBMA)' , value: 'Level 8 Diploma in Business and Management Research (EBMA)' },
        { label: 'BA Hons.' , value: 'BA Hons.' },
        { label: 'MBA' , value: 'MBA' },
        { label: 'DBA' , value: 'DBA' },
        { label: 'Dphill/DBA' , value: 'Dphill/DBA' },
        { label: 'Others (not specified)' , value: 'Others (not specified)' },
]