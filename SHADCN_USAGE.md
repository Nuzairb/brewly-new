# shadcn/ui Components - Usage Guide

## ✅ Successfully Installed Components

The following shadcn/ui components have been installed:

1. **button** - Customizable button component
2. **card** - Card container with header, content, footer
3. **badge** - Small status indicators
4. **avatar** - User avatar/profile pictures
5. **dialog** - Modal dialogs
6. **dropdown-menu** - Dropdown menus
7. **input** - Form input fields
8. **label** - Form labels
9. **select** - Select dropdowns
10. **tabs** - Tab navigation

## 🎨 Design Preservation

**IMPORTANT**: Aapke current design ki dimensions aur styling ko maintain karne ke liye:

### Option 1: Use shadcn components with custom styling
```tsx
import { Button } from "@/components/ui/button";

// Override default styles while keeping functionality
<Button 
  className="w-[141px] h-[48px] rounded-[8px] border border-[#1A5D4A] bg-transparent hover:bg-[#1A5D4A0A]"
  style={{
    fontFamily: 'Lato, sans-serif',
    fontWeight: 400,
    fontSize: '18px',
    color: '#1A5D4A',
  }}
>
  Create Bundle
</Button>
```

### Option 2: Keep existing design, add shadcn for new features
Aapke current components (Sidebar, MainContent) ko unchanged rakhein.
Naye features ke liye shadcn components use karein.

## 📦 Usage Examples

### 1. Button Component
```tsx
import { Button } from "@/components/ui/button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>

// Custom styling (preserve your design)
<Button className="bg-gradient-to-r from-[#007256] to-[#00A57D]">
  AI Suggested Bundles
</Button>
```

### 2. Card Component
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card className="rounded-[16px] border border-[#F6F6F6] bg-[#FAFAFA]">
  <CardHeader>
    <CardTitle>Active Bundles</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-[22px] font-bold">22</div>
    <p className="text-[12px] text-[#787777]">Running campaigns</p>
  </CardContent>
</Card>
```

### 3. Dialog (Modal)
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Create Bundle</Button>
  </DialogTrigger>
  <DialogContent className="max-w-[600px]">
    <DialogHeader>
      <DialogTitle>Create New Bundle</DialogTitle>
    </DialogHeader>
    {/* Your form here */}
  </DialogContent>
</Dialog>
```

### 4. Input & Label
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="bundle-name">Bundle Name</Label>
  <Input 
    id="bundle-name" 
    placeholder="Enter bundle name"
    className="h-[48px] rounded-[8px]"
  />
</div>
```

### 5. Select Dropdown
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px] h-[48px]">
    <SelectValue placeholder="Select location" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
    <SelectItem value="downtown">Downtown</SelectItem>
    <SelectItem value="jbr">JBR</SelectItem>
  </SelectContent>
</Select>
```

### 6. Badge Component
```tsx
import { Badge } from "@/components/ui/badge";

<Badge className="bg-[#05C16833] text-[#14CA74] border-[#05C16833]">
  +12%
</Badge>
```

### 7. Tabs Component
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="bundles">Bundles</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  <TabsContent value="analytics">
    {/* Analytics content */}
  </TabsContent>
</Tabs>
```

## 🎯 Recommended Integration Strategy

### Phase 1: Current State (No Changes Required)
- Keep all existing components as-is
- Your design, dimensions, and styling remain unchanged

### Phase 2: New Features (Use shadcn)
Use shadcn components for:
- Bundle creation forms
- Edit dialogs
- Confirmation modals
- Filter dropdowns
- Search inputs
- Settings pages

### Phase 3: Gradual Refactoring (Optional)
Gradually replace inline styles with shadcn components while preserving exact dimensions:

```tsx
// Before (inline styles)
<button 
  style={{
    width: '141px',
    height: '48px',
    borderRadius: '8px',
    border: '1px solid #1A5D4A',
    // ... more styles
  }}
>
  Create Bundle
</button>

// After (shadcn with custom classes)
<Button 
  variant="outline"
  className="w-[141px] h-[48px] rounded-[8px] border-[#1A5D4A] text-[#1A5D4A] hover:bg-[#1A5D4A0A]"
>
  Create Bundle
</Button>
```

## 🔧 Customization

### Modify Theme Colors
Edit `src/app/globals.css` to match your brand colors:

```css
:root {
  --primary: oklch(from #00674E l c h); /* Your green color */
  --radius: 0.625rem; /* Already set to 10px */
}
```

### Create Custom Variants
Extend button variants for your specific needs:

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  // ... existing code
  {
    variants: {
      variant: {
        // ... existing variants
        brewly: "bg-gradient-to-r from-[#007256] to-[#00A57D] text-white hover:opacity-90",
      },
    },
  }
)
```

## 📚 Next Steps

1. **Keep Current Design**: No changes needed to existing components
2. **Build New Features**: Use shadcn for forms, modals, dialogs
3. **Test Thoroughly**: Ensure all components work as expected
4. **Gradual Migration**: Optionally refactor inline styles over time

## 🚀 Quick Start Example

Create a "Create Bundle" dialog:

```tsx
// src/components/features/CreateBundleDialog.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateBundleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="w-[141px] h-[48px] rounded-[8px] border-[#1A5D4A] text-[#1A5D4A] hover:bg-[#1A5D4A0A]"
        >
          Create Bundle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-lato">Create New Bundle</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Bundle Name</Label>
            <Input id="name" placeholder="e.g., Morning Coffee Pack" className="h-[48px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (AED)</Label>
            <Input id="price" type="number" placeholder="0.00" className="h-[48px]" />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-[#007256] to-[#00A57D]">
              Create Bundle
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## 📝 Summary

✅ shadcn/ui components successfully installed  
✅ Your current design will NOT change  
✅ Use shadcn for new features only  
✅ All components are customizable with Tailwind classes  
✅ Your exact dimensions and styles can be preserved  

Happy coding! 🎉
