// 创建轮播图（需认证）
import { jsonResponse } from '../../_middleware.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { title, subtitle, image_url, link_url, btn_text, btn_link, sort_order, type, items } = await request.json();
        
        const bannerType = type || 'standard';
        if (!title || (bannerType !== 'wheel' && !image_url)) {
            return jsonResponse({ error: '请输入标题并上传图片' }, 400);
        }
        
        const bannerType = type || 'standard';
        const itemsJson = Array.isArray(items) ? JSON.stringify(items) : '[]';
        
        const result = await env.DB.prepare(
            `INSERT INTO banners (title, subtitle, image_url, link_url, btn_text, btn_link, sort_order, type, items) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            title,
            subtitle || '',
            image_url,
            link_url || '',
            btn_text || '了解更多',
            btn_link || '',
            sort_order || 0,
            bannerType,
            itemsJson
        ).run();
        
        return jsonResponse({ 
            success: true, 
            id: result.meta?.last_row_id 
        });
        
    } catch (error) {
        console.error('Create banner error:', error);
        return jsonResponse({ error: error.message || '创建轮播图失败，请稍后再试' }, 500);
    }
}
