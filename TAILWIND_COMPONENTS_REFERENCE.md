# 📚 TAILWIND QUICK REFERENCE GUIDE

## Button Examples

```jsx
{/* Primary Button */}
<button className="btn btn-primary">Book Service</button>

{/* Primary Small */}
<button className="btn btn-primary btn-sm">Sign Up</button>

{/* Primary Large */}
<button className="btn btn-primary btn-lg">Get Started</button>

{/* Secondary Button */}
<button className="btn btn-secondary">Learn More</button>

{/* Outline Button */}
<button className="btn btn-outline-primary">Contact Us</button>

{/* Ghost Button */}
<button className="btn btn-ghost">Dismiss</button>
```

## Card Examples

```jsx
{/* Basic Card */}
<div className="card p-6">
  <h3>Title</h3>
  <p>Content here</p>
</div>

{/* Elevated Card (more shadow) */}
<div className="elevated-card p-6">
  <p>Important content</p>
</div>

{/* Card with Hover Effect (built-in) */}
<div className="card hover:shadow-card-hover transition-smooth">
  <p>Hover over me!</p>
</div>
```

## Badge Examples

```jsx
{/* Primary Badge */}
<span className="badge badge-primary">New</span>

{/* Success Badge */}
<span className="badge badge-success">Active</span>

{/* Warning Badge */}
<span className="badge badge-warning">Pending</span>

{/* Error Badge */}
<span className="badge badge-error">Urgent</span>

{/* Status Badge */}
<span className="status-badge-success">Completed</span>
```

## Text & Colors

```jsx
{/* Heading */}
<h1>Main Heading</h1>           {/* 4xl bold */}
<h2>Section Title</h2>          {/* 3xl semibold */}
<h3>Subsection</h3>             {/* 2xl semibold */}

{/* Text Colors */}
<p className="text-neutral-900">Dark text</p>
<p className="text-neutral-600">Muted text</p>
<p className="text-primary-600">Link-like text</p>

{/* Gradient Text */}
<h2 className="gradient-text">Move It</h2>
```

## Layout

```jsx
{/* Container with max-width */}
<div className="container-centered">
  <p>This content is centered and max-width</p>
</div>

{/* Grid Layouts */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

{/* Flex Layouts */}
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

{/* Responsive Hide/Show */}
<div className="hidden md:flex">Only visible on medium+ screens</div>
<div className="md:hidden">Only visible on small screens</div>
```

## Spacing

```jsx
{/* Padding */}
<div className="p-md">Padding</div>        {/* 24px */}
<div className="px-lg py-md">Mixed</div>   {/* horizontal 40px, vertical 24px */}

{/* Margin */}
<div className="mb-lg">Margin bottom</div>
<div className="m-auto">Auto margin</div>

{/* Gap (for flex/grid) */}
<div className="flex gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Rounded Corners

```jsx
<div className="rounded-default">Border radius 14px</div>
<div className="rounded-lg">Border radius 20px</div>
<div className="rounded-xl">Border radius 28px</div>
<div className="rounded-full">Full circle</div>
```

## Shadows

```jsx
<div className="shadow-soft">Subtle shadow</div>
<div className="shadow-hover">Hover shadow (larger)</div>
<div className="shadow-card">Card shadow</div>
<div className="shadow-card-hover">Card hover shadow</div>
```

## Transitions & Animations

```jsx
{/* Smooth transition */}
<div className="transition-smooth hover:transform hover:scale-105">
  Hover me!
</div>

{/* Individual transition */}
<button className="transition-colors duration-300 hover:bg-primary-600">
  Change color
</button>

{/* Fade animation */}
<div className="animate-fadeIn">Fades in</div>

{/* Slide up animation */}
<div className="animate-slideInUp">Slides up</div>
```

## Forms

```jsx
{/* Input */}
<input 
  type="text" 
  placeholder="Enter text..."
  className="w-full" 
/>

{/* Textarea */}
<textarea 
  placeholder="Enter message..."
  className="w-full"
/>

{/* Label */}
<label>Your Name</label>
<input type="text" />
```

## Alerts & Notifications

```jsx
{/* Success Alert */}
<div className="notification notification-success">
  ✅ Success message
</div>

{/* Warning Alert */}
<div className="notification notification-warning">
  ⚠️ Warning message
</div>

{/* Error Alert */}
<div className="notification notification-error">
  ❌ Error message
</div>

{/* Info Alert */}
<div className="notification notification-info">
  ℹ️ Info message
</div>
```

## Dark Mode Support

All components automatically support dark mode!

```jsx
{/* These work in both light and dark modes */}
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50">
  Responsive to theme
</div>
```

---

## 🎨 COLOR QUICK REFERENCE

### Accessing Colors
```
Primary: primary-50, primary-100, primary-200, ..., primary-900
Secondary: secondary-50, secondary-100, ..., secondary-900  
Neutral: neutral-50, neutral-100, ..., neutral-950
Success: success-50, success-500, success-600
Warning: warning-50, warning-500, warning-600
Error: error-50, error-500, error-600
Info: info-50, info-500, info-600
```

### Color Usage
```jsx
<div className="bg-primary-100 text-primary-700">
  Soft primary background with dark text
</div>

<div className="border-2 border-secondary-500">
  Border with secondary color
</div>

<div className="shadow-[0_0_20px_rgba(51,102,255,0.6)]">
  Custom blue shadow
</div>
```

---

## ✨ COMPONENT CHEAT SHEET

```jsx
{/* Complete Feature Card */}
<div className="card p-8 hover:shadow-card-hover transition-smooth">
  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-2xl mb-4">
    🚀
  </div>
  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
    Feature Title
  </h3>
  <p className="text-neutral-600 mb-4">
    Feature description goes here
  </p>
  <a href="#" className="text-primary-600 font-medium hover:text-primary-700">
    Learn more →
  </a>
</div>

{/* Complete Call-to-Action Section */}
<section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16 px-8 rounded-xl text-center">
  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
    Ready to get started?
  </h2>
  <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
    Join thousands of satisfied customers who use Move It for their moving needs.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button className="btn btn-primary btn-lg">Get Started</button>
    <button className="btn btn-outline-primary btn-lg">Learn More</button>
  </div>
</section>
```

---

## 🚀 TIPS FOR SUCCESS

1. **Use Tailwind classes** instead of writing custom CSS
2. **Leverage the color system** - stick to the palette for consistency
3. **Use responsive prefixes** - `md:`, `lg:`, etc. for responsive design
4. **Combine utilities freely** - mix and match classes as needed
5. **Check tailwind.config.js** for available customizations
6. **Dark mode is automatic** - use `[data-theme="dark"]` in CSS when needed
7. **Keep it clean** - extract complex components into their own files

---

**Questions? Refer to [Tailwind CSS Documentation](https://tailwindcss.com/docs)**
