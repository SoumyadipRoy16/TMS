// /types/submission.ts

export interface ITestCase {
    input: string;
    output: string;
  }
  
  export interface IQuestion {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    testCases: ITestCase[];
  }
  
  export interface ISubmission {
    _id: string;
    userId: string;
    username: string;
    questionTitle: string;
    code: string;
    language: string;
    score: number | null;
    timestamp: string;
  }