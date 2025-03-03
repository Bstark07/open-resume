export const DEFAULT_CONTACT_DETAILS = {
  email: { url: 'mailto:', text: 'email@example.com' },
  phone: { url: 'tel:', text: '(555) 555-5555' },
  linkedin: { url: 'https://linkedin.com/in/', text: 'linkedin.com/in/profile' }
};

export const DEFAULT_TITLE_CONTENT = `
<h1 class="text-[var(--font-title)] font-bold mt-0 mb-[var(--spacing-md)]">Your Name</h1>
`;

export const DEFAULT_EDITOR_CONTENT = `
<h2 class="text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]">Summary</h2>
<p></p>

<h2 class="text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]">Experience</h2>
<ul>
  <li>Click here to add your experience details</li>
</ul>

<h2 class="text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]">Education</h2>
<p></p>

<h2 class="text-header font-semibold mt-[var(--spacing-lg)] mb-[var(--spacing-sm)]">Certifications</h2>
<p></p>
`;

export const EDITOR_CLASSES = {
  paragraph: 'text-body mb-[var(--spacing-sm)]',
  bulletList: 'ml-[var(--spacing-md)] mb-[var(--spacing-md)] space-y-[var(--spacing-xxs)]',
  orderedList: 'ml-[var(--spacing-md)] mb-[var(--spacing-md)] space-y-[var(--spacing-xxs)]',
  listItem: 'text-body pl-[var(--spacing-xs)]',
  link: 'text-blue-600 hover:text-blue-800 underline'
}; 