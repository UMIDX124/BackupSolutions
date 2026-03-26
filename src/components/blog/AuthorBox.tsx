import { AUTHORS } from "@/lib/blog";

export default function AuthorBox({ authorId }: { authorId: string }) {
  const author = AUTHORS[authorId];

  if (!author) return null;

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="bg-amber/10 text-amber w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg shrink-0">
          {author.initials}
        </div>

        <div className="flex flex-col gap-2">
          {/* Name & Title */}
          <div>
            <h4 className="font-display font-semibold text-warm-white">
              {author.name}
            </h4>
            <p className="text-sm text-amber">{author.title}</p>
          </div>

          {/* Bio */}
          <p className="text-sm text-warm-gray">{author.bio}</p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {author.expertise.map((skill) => (
              <span
                key={skill}
                className="bg-surface-secondary text-warm-gray text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
