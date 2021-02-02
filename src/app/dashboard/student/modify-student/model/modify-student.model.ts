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
    phone: string;
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

export class AttachmentPath{
    cirriculumVitae: string;
    transcript: string;
    courseCompletion: string;
    offerLetter: string;
    enrollmentLetter: string;
    withDrawalLetter: string;
    otherLetter: string;
    feedbackForm: string;
    warningLetter: string;
    previousQualification1: string;
    previousQualification2: string;
}