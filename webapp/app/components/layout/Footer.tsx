export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} SurveyPro. All rights reserved.</p>
        <nav className="flex space-x-6 text-sm">
          <a href="https://github.com/jbayron09/mims-survey-platform" target="_blank" rel="noreferrer noopener" className="hover:text-white">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
