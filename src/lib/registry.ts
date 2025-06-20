import { Index } from '@/__registry__';

import { registryItemSchema } from 'shadcn/registry';

const memoizedIndex: typeof Index = Object.fromEntries(
    Object.entries(Index).map(([style, items]) => [style, { ...items }])
);

export function getRegistryComponent(name: string) {
    return memoizedIndex[name]?.component;
}

export async function getRegistryItem(name: string) {
    const item = memoizedIndex[name];

    if (!item) {
        return null;
    }
    // TODO: remove when we migrate to new registry.
    item.files = item.files.map((file: unknown) => (typeof file === 'string' ? { path: file } : file));

    const result = registryItemSchema.safeParse(item);
    if (!result.success) {
        return null;
    }

    const files: typeof result.data.files = [];

    const parsed = registryItemSchema.safeParse({
        ...result.data,
        files
        // meta,
    });

    if (!parsed.success) {
        console.error(parsed.error.message);

        return null;
    }

    return parsed.data;
}

export function fixImport(content: string) {
    const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g;

    const replacement = (match: string, path: string, type: string, component: string) => {
        if (type.endsWith('components')) {
            return `@/components/${component}`;
        } else if (type.endsWith('ui')) {
            return `@/components/ui/${component}`;
        } else if (type.endsWith('hooks')) {
            return `@/hooks/${component}`;
        } else if (type.endsWith('lib')) {
            return `@/lib/${component}`;
        }

        return match;
    };

    return content.replace(regex, replacement);
}

export type FileTree = {
    name: string;
    path?: string;
    children?: FileTree[];
};

export function createFileTreeForRegistryItemFiles(files: Array<{ path: string; target?: string }>) {
    const root: FileTree[] = [];

    for (const file of files) {
        const path = file.target ?? file.path;
        const parts = path.split('/');
        let currentLevel = root;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isFile = i === parts.length - 1;
            const existingNode = currentLevel.find((node) => node.name === part);

            if (existingNode) {
                if (isFile) {
                    existingNode.path = path;
                } else {
                    currentLevel = existingNode.children!;
                }
            } else {
                const newNode: FileTree = isFile ? { name: part, path } : { name: part, children: [] };

                currentLevel.push(newNode);

                if (!isFile) {
                    currentLevel = newNode.children!;
                }
            }
        }
    }

    return root;
}
