// components/test/CodeEditor.tsx

'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type Language = 'python' | 'javascript' | 'java' | 'cpp';

type Props = {
  currentQuestionId: string;
  onQuestionChange: (question: any) => void;
  onTestComplete: (shouldReattempt: boolean) => void;
};

const languages: { value: Language; label: string }[] = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const defaultCode: Record<Language, string> = {
  python: '# Write your Python code here',
  javascript: '// Write your JavaScript code here',
  java: '// Write your Java code here',
  cpp: '// Write your C++ code here',
};

export default function CodeEditor({ currentQuestionId, onQuestionChange, onTestComplete }: Props) {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(defaultCode[language]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setCode(defaultCode[value]);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/coding-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: currentQuestionId,
          code,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit code');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      showToast("Code submitted successfully", "default");

      if (data.isComplete) {
        setShowCompletionDialog(true);
      } else if (data.nextQuestion) {
        setCode(defaultCode[language]); // Reset editor for next question
        onQuestionChange(data.nextQuestion);
      }
    } catch (error) {
      showToast("Failed to submit code. Please try again.", "destructive");
      setShowErrorDialog(true);  // Show error dialog in case of submission failure
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Code Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={(value: Language) => handleLanguageChange(value)} defaultValue={language}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Editor
            height="60vh"
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            language={language}
            value={code}
            onChange={handleEditorChange}
          />
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-between">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Code'}
        </Button>
      </div>

      <AlertDialog open={showCompletionDialog} onOpenChange={(open) => setShowCompletionDialog(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submission Complete</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            You've completed all questions in this challenge. Congratulations!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCompletionDialog(false)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorDialog} onOpenChange={(open) => setShowErrorDialog(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submission Error</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Something went wrong while submitting your code. Please try again later.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowErrorDialog(false)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
