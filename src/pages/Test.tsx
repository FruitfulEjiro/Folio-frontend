import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Wand2 } from "lucide-react";

export default function ProfileForm() {
   const [form, setForm] = useState({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      bio: "",
      skillsText: "",
      skillList: [
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
      ],
      socials: [] as string[],
      projects: [
         { title: "", summary: "", link: "" },
         { title: "", summary: "", link: "" },
      ],
   });

   const [profilePicture, setProfilePicture] = useState<File | null>(null);
   const [resume, setResume] = useState<File | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setForm({ ...form, [id]: value });
   };

   const handleSkillChange = (index: number, key: "name" | "percent", value: string) => {
      const newSkills = [...form.skillList];
      newSkills[index][key] = value;
      setForm({ ...form, skillList: newSkills });
   };

   const handleSocials = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      setForm((prev) => ({
         ...prev,
         socials: checked
            ? [...prev.socials, value]
            : prev.socials.filter((s) => s !== value),
      }));
   };

   const handleProjectChange = (index: number, key: "title" | "summary" | "link", value: string) => {
      const newProjects = [...form.projects];
      newProjects[index][key] = value;
      setForm({ ...form, projects: newProjects });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("title", form.title);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("bio", form.bio);
      data.append("skillsText", form.skillsText);

      form.skillList.forEach((skill, i) => {
         data.append(`skills[${i}][name]`, skill.name);
         data.append(`skills[${i}][percent]`, skill.percent);
      });

      form.projects.forEach((proj, i) => {
         data.append(`projects[${i}][title]`, proj.title);
         data.append(`projects[${i}][summary]`, proj.summary);
         data.append(`projects[${i}][link]`, proj.link);
      });

      form.socials.forEach((social) => data.append("socials[]", social));

      if (profilePicture) data.append("profilePicture", profilePicture);
      if (resume) data.append("resume", resume);

      //   try {
      //      const res = await axios.post("https://your-api.com/submit", data, {
      //         headers: {
      //            "Content-Type": "multipart/form-data",
      //         },
      //      });

      //      alert("Submitted successfully!");
      //      console.log(res.data);
      //   } catch (err: any) {
      //      console.error(err);
      //      alert("Error submitting form");
      //   }
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         {/* ... map over form sections with inputs and bind values + handlers */}
         <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={form.fullName} onChange={handleChange} />
         </div>
         {/* Repeat for other text inputs */}

         {/* Skill Section */}
         {form.skillList.map((skill, i) => (
            <div key={i} className="space-y-2">
               <Input
                  placeholder={`Skill ${i + 1}`}
                  value={skill.name}
                  onChange={(e) => handleSkillChange(i, "name", e.target.value)}
               />
               <Input
                  placeholder="Percentage"
                  value={skill.percent}
                  onChange={(e) => handleSkillChange(i, "percent", e.target.value)}
               />
            </div>
         ))}

         {/* Social Checkboxes */}
         {["github", "linkedin", "twitter", "instagram", "facebook"].map((social) => (
            <div key={social}>
               <Label>{social}</Label>
               <Input
                  type="checkbox"
                  value={social}
                  checked={form.socials.includes(social)}
                  onChange={handleSocials}
               />
            </div>
         ))}

         {/* Projects */}
         {form.projects.map((proj, i) => (
            <div key={i} className="space-y-2">
               <Input
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleProjectChange(i, "title", e.target.value)}
               />
               <Textarea
                  placeholder="Summary"
                  value={proj.summary}
                  onChange={(e) => handleProjectChange(i, "summary", e.target.value)}
               />
               <Input
                  placeholder="Link"
                  value={proj.link}
                  onChange={(e) => handleProjectChange(i, "link", e.target.value)}
               />
            </div>
         ))}

         {/* File Inputs */}
         <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input
               type="file"
               accept="image/*"
               onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
            />
         </div>
         <div>
            <Label htmlFor="resume">Resume</Label>
            <Input
               type="file"
               accept="application/pdf"
               onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
         </div>

         <Button type="submit">
            <Wand2 className="w-4 h-4 mr-2" />
            Submit
         </Button>
      </form>
   );
}
