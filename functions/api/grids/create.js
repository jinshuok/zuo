// 创建九宫格（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { title, image_url, link_url, sort_order } = await request.json();
        
        if (!title || !image_url) {
            return jsonResponse({ error: '请输入标题并上传图片' }, 400);
        }
        
        const result = await env.DB.prepare(
            `INSERT INTO grids (title, image_url, link_url, sort_order) 
             VALUES (?, ?, ?, ?)`
        ).bind(
            title,
            image_url,
            link_url || '',
            sort_order || 0
        ).run();
        
        return jsonResponse({ 
            success: true, 
            id: result.meta?.last_row_id 
        });
        
    } catch (error) {
        console.error('Create grid error:', error);
        return jsonResponse({ error: '创建九宫格失败，请稍后再试' }, 500);
    }
}
