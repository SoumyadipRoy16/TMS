'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type Language = 'python' | 'javascript' | 'java' | 'cpp';

type Props = {
  currentQuestionId: string;
  onQuestionChange: (question: any) => void;
}

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
}

export default function CodeEditor({ currentQuestionId, onQuestionChange }: Props) {
  const { theme } = useTheme()
  const { showToast } = useToast()
  const [language, setLanguage] = useState<Language>('python')
  const [code, setCode] = useState(defaultCode[language])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLanguageChange = (value: Language) => {
    setLanguage(value)
    setCode(defaultCode[value])
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
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
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      showToast("Code submitted successfully", "default")

      if (data.isComplete) {
        showToast("You have completed all questions!", "default")
      } else if (data.nextQuestion) {
        // Reset editor for next question
        setCode(defaultCode[language])
        onQuestionChange(data.nextQuestion)
      }
    } catch (error) {
      showToast("Failed to submit code. Please try again.", "destructive")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
          height="400px"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
        <Button 
          className="mt-4 w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Code'}
        </Button>
      </CardContent>
    </Card>
  )
}