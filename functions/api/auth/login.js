// 管理员登录
import { signToken, jsonResponse } from '../../_middleware.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const { username, password } = await request.json();
        
        if (!username || !password) {
            return jsonResponse({ error: '请输入用户名和密码' }, 400);
        }
        
        // 查找管理员
        const admin = await env.DB.prepare(
            'SELECT id, username, password_hash FROM admins WHERE username = ?'
        ).bind(username).first();
        
        if (!admin) {
            return jsonResponse({ error: '用户名或密码错误' }, 401);
        }
        
        // 验证密码 (SHA-256)
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const passwordHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        if (passwordHash !== admin.password_hash) {
            return jsonResponse({ error: '用户名或密码错误' }, 401);
        }
        
        // 生成 Token
        const token = await signToken({ userId: admin.id, username: admin.username }, env.JWT_SECRET);
        
        return jsonResponse({
            success: true,
            token,
            user: { id: admin.id, username: admin.username }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        return jsonResponse({ error: '登录失败，请稍后再试' }, 500);
    }
}
