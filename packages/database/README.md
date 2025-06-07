Common scenarios:

1. **When you change your schema.prisma file:**

```bash
yarn db:migrate  # Creates a migration and applies it
```

2. **When you want to reset everything to clean state:**

```bash
yarn db:reset   # Drops database and reapplies all migrations
```

3. **After pulling new code with migrations:**

```bash
yarn db:generate  # Updates types
yarn db:deploy    # Applies any new migrations
```

4. **Quick development changes (not for production):**

```bash
yarn db:push     # Pushes schema changes directly without migrations
```
