import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const GITHUB_PAT = process.env.GITHUB_PAT;
        const REPO_OWNER = process.env.REPO_OWNER || 'KenHuang21';
        const REPO_NAME = process.env.REPO_NAME || 'strategic-cockpit-dashboard';

        if (!GITHUB_PAT) {
            return NextResponse.json(
                { error: 'GitHub PAT not configured' },
                { status: 500 }
            );
        }

        // Call GitHub API to trigger workflow_dispatch
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/update_data.yml/dispatches`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `Bearer ${GITHUB_PAT}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ref: 'main',
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GitHub API error:', errorText);
            return NextResponse.json(
                { error: 'Failed to trigger workflow', details: errorText },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Data refresh triggered successfully',
        });
    } catch (error) {
        console.error('Error triggering update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Prevent caching
export const dynamic = 'force-dynamic';
