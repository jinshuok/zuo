// 获取素材列表（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestGet(context) {
    const { env } = context;

    try {
        const { results } = await env.DB.prepare(
            'SELECT id, name, image_url, created_at FROM assets ORDER BY id DESC'
        ).all();

        return jsonResponse({ success: true, assets: results || [] });
    } catch (error) {
        console.error('List assets error:', error);
        return jsonResponse({ error: '获取素材列表失败，请稍后再试' }, 500);
    }
}
