import CodeEditor from '@/components/test/CodeEditor'
import ProblemStatement from '@/components/test/ProblemStatement'
import TestCaseValidation from '@/components/test/TestCaseValidation'
import Timer from '@/components/test/Timer'

export default function Test() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Coding Test</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <ProblemStatement />
          <TestCaseValidation />
        </div>
        <div>
          <Timer />
          <CodeEditor />
        </div>
      </div>
    </div>
  )
}