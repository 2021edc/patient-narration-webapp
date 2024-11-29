export interface INarrationParsedData {
  [siteId: string]: {
    [subjectId: string]: {
      subject: string;
      site: string;
      consent_date: string;
      demographics: string;
    };
  };
}

export type NestedSubjectData = {
  [siteId: string]: {
    [subjectId: string]: SubjectEntry;
  };
};

export type SubjectEntry = {
  subject: string;
  site: string;
  consent_date: string;
  demographics: string;
};

export type ExtractedSubjects = {
  [subjectId: string]: SubjectEntry;
};

export interface ISubjectData {
  subject: string;
  site: string;
  consent_date: string;
  demographics: string;
}
