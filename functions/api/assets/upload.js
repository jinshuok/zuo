// 上传素材（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { name, image_url } = await request.json();

        if (!image_url) {
            return jsonResponse({ error: '请上传图片' }, 400);
        }

        const result = await env.DB.prepare(
            'INSERT INTO assets (name, image_url) VALUES (?, ?)'
        ).bind(name || '', image_url).run();

        return jsonResponse({
            success: true,
            id: result.meta?.last_row_id
        });
    } catch (error) {
        console.error('Upload asset error:', error);
        return jsonResponse({ error: '上传素材失败，请稍后再试' }, 500);
    }
}
